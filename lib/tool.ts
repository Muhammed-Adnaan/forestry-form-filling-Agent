// Add type declarations for window
declare global {
  interface Window {
    __getReactFormData?: () => Record<string, unknown>;
    __setReactFormData?: (data: Record<string, unknown>) => void;
    __setReactLanguage?: (lang: string) => void;
    __getReactLanguage?: () => string;
    getFormDetails?: () => Record<string, unknown> | null;
    fillFormDetails?: (data: Record<string, unknown>) => void;
  }
}

// Function to extract all current data from the form
export const getFormDetails = (sectionName?: string): Record<string, unknown> | null => {
  if (typeof document === 'undefined') return null;

  let root: Element | Document = document;

  // If sectionName is provided, try to find the specific container
  if (sectionName) {
    const section = document.querySelector(`[data-section="${sectionName}"]`);
    if (section) {
      root = section;
    } else {
      console.warn(`Section "${sectionName}" not found in DOM.`);
      return null;
    }
  }

  const data: Record<string, unknown> = {};

  // Find all input-like elements within the root (either document or specific section)
  const elements = root.querySelectorAll('input, select, textarea');

  elements.forEach((el) => {
    const item = el as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    if (item.name) {
      if (item.type === 'radio' || item.type === 'checkbox') {
        if ((item as HTMLInputElement).checked) {
          data[item.name] = item.value;
        }
      } else if (item.type === 'file') {
        const fileInput = item as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
          data[item.name] = fileInput.files[0].name;
        }
      } else {
        data[item.name] = item.value;
      }

      // Extract the available options for select fields
      if (item.tagName.toLowerCase() === 'select') {
        const selectElement = item as HTMLSelectElement;
        const optionsMap: Record<string, string> = {};
        for (let j = 0; j < selectElement.options.length; j++) {
          const opt = selectElement.options[j];
          if (opt.value && opt.value !== '0' && opt.value !== '') {
            optionsMap[opt.value] = opt.text.trim() || opt.value;
          }
        }
        if (Object.keys(optionsMap).length > 0) {
          data[`${item.name}_options`] = optionsMap;
        }
      }
    }
  });

  if (typeof window !== 'undefined' && window.__getReactLanguage) {
    data.language = window.__getReactLanguage();
  }

  return data;
};

// Resolves labels to option values for select fields.
// If the agent passes "Hassan" instead of "17898", this function will find the correct key.
const resolveSelectValues = (data: Record<string, unknown>): Record<string, unknown> => {
  if (typeof document === 'undefined') return data;

  const resolved = { ...data };

  Object.keys(resolved).forEach((key) => {
    // Skip _options keys, they are not field values
    if (key.endsWith('_options')) return;

    const value = String(resolved[key] ?? '');
    if (!value || value === '0') return;

    const selectEl = document.querySelector<HTMLSelectElement>(`select[name="${key}"]`);
    if (!selectEl) return;

    // Check if value already matches an option's value attribute - if so, no resolution needed
    const exactMatch = Array.from(selectEl.options).some((opt) => opt.value === value);
    if (exactMatch) return;

    // Try to find a match by label text (case-insensitive)
    const labelMatch = Array.from(selectEl.options).find(
      (opt) => opt.text.trim().toLowerCase() === value.toLowerCase()
    );

    if (labelMatch) {
      console.log(
        `[fillFormDetails] Resolved "${key}": "${value}" → "${labelMatch.value}" (${labelMatch.text.trim()})`
      );
      resolved[key] = labelMatch.value;
    } else {
      console.warn(
        `[fillFormDetails] Could not resolve value "${value}" for field "${key}". No matching option found.`
      );
    }
  });

  return resolved;
};

// Function to programmatically fill the form from an object
export const fillFormDetails = (data: Record<string, unknown>): void => {
  if (!data) return;

  if (data.language && typeof window !== 'undefined' && window.__setReactLanguage) {
    window.__setReactLanguage(String(data.language).toLowerCase());
    delete data.language;
  }

  // Resolve any label strings to their corresponding option values for selects
  const resolvedData = resolveSelectValues(data);

  // The most robust way to fill a React form is to update its state directly.
  if (typeof window !== 'undefined' && window.__setReactFormData) {
    window.__setReactFormData(resolvedData);
    return;
  }

  if (typeof document === 'undefined') return;

  // Fallback: DOM manipulation if React state is not exposed
  console.warn('React state setter not found, falling back to DOM manipulation.');
  Object.keys(data).forEach((key) => {
    const value = data[key];
    const elements = document.querySelectorAll(`[name="${key}"]`);

    elements.forEach((element) => {
      const el = element as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      if (el.type === 'radio' || el.type === 'checkbox') {
        if (String(el.value) === String(value) && !(el as HTMLInputElement).checked) {
          el.click();
        }
      } else if (el.type !== 'file') {
        el.focus();

        let nativeSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set;

        if (el.tagName === 'SELECT') {
          nativeSetter = Object.getOwnPropertyDescriptor(
            window.HTMLSelectElement.prototype,
            'value'
          )?.set;
        } else if (el.tagName === 'TEXTAREA') {
          nativeSetter = Object.getOwnPropertyDescriptor(
            window.HTMLTextAreaElement.prototype,
            'value'
          )?.set;
        }

        if (nativeSetter) {
          nativeSetter.call(el, String(value ?? ''));
        } else {
          el.value = String(value ?? '');
        }

        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        el.blur();
      }
    });
  });
};

// Expose to window for easy console debugging or external script access
if (typeof window !== 'undefined') {
  window.getFormDetails = getFormDetails;
  window.fillFormDetails = fillFormDetails;
}
