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
export const getFormDetails = (): Record<string, unknown> | null => {
  if (typeof document === 'undefined') return null;

  const form = document.querySelector('form');
  if (!form) {
    // Fallback to React state if form not found in DOM
    if (typeof window !== 'undefined' && window.__getReactFormData) {
      return window.__getReactFormData();
    }
    return null;
  }

  const data: Record<string, unknown> = {};
  const elements = form.elements as HTMLCollectionOf<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;

  for (let i = 0; i < elements.length; i++) {
    const item = elements[i];
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
  }

  if (typeof window !== 'undefined' && window.__getReactLanguage) {
    data.language = window.__getReactLanguage();
  }

  return data;
};

// Function to programmatically fill the form from an object
export const fillFormDetails = (data: Record<string, unknown>): void => {
  if (!data) return;

  if (data.language && typeof window !== 'undefined' && window.__setReactLanguage) {
    window.__setReactLanguage(String(data.language).toLowerCase());
    delete data.language; // We might not need to set it on the form data itself
  }

  // The most robust way to fill a React form is to update its state directly.
  if (typeof window !== 'undefined' && window.__setReactFormData) {
    window.__setReactFormData(data);
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
