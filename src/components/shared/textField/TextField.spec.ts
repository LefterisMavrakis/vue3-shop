import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import TextField from './TextField.vue';

describe('TextField', () => {
  it('renders input with default placeholder', () => {
    const wrapper = mount(TextField, {
      props: { modelValue: '' },
    });
    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(input.attributes('placeholder')).toBe('Enter text...');
  });

  it('renders input with custom placeholder', () => {
    const wrapper = mount(TextField, {
      props: { modelValue: '', placeholder: 'Search here...' },
    });
    expect(wrapper.find('input').attributes('placeholder')).toBe('Search here...');
  });

  it('updates input value when modelValue changes', async () => {
    const wrapper = mount(TextField, {
      props: { modelValue: 'Initial' },
    });

    const input = wrapper.find('input');
    expect(input.element.value).toBe('Initial');

    await wrapper.setProps({ modelValue: 'Updated' });
    expect(input.element.value).toBe('Updated');
  });

  it('emits update:modelValue when typing', async () => {
    const wrapper = mount(TextField, {
      props: { modelValue: '' },
    });

    const input = wrapper.find('input');
    await input.setValue('New Text');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['New Text']);
  });

  it('debounces input if debounce prop is set', async () => {
    vi.useFakeTimers();
    const wrapper = mount(TextField, {
      props: { modelValue: '', debounce: 300 },
    });

    const input = wrapper.find('input');
    await input.setValue('Delayed Update');

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();

    vi.advanceTimersByTime(300);
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Delayed Update']);

    vi.useRealTimers();
  });
});
