import { mount } from 'vue-test-utils'
import AeAddressInput from './aeAddressInput.vue'

describe('AeAddressInput', () => {
  it('formats passed value', () => {
    const wrapper = mount(AeAddressInput, { propsData: {
      value: '0x1234512345671234567123456'
    } })
    expect(wrapper.element.value).toBe('0x12345 1234567 1234567\n123456')
  })

  it('adds prefix on input', () => {
    const wrapper = mount(AeAddressInput)
    wrapper.element.value = 'beef'
    wrapper.trigger('input')
    expect(wrapper.element.value).toBe('0xbeef')
  })

  it('removes non-hex symbols', () => {
    const wrapper = mount(AeAddressInput)
    const value = '0xaddress'
    wrapper.element.value = value
    wrapper.element.setSelectionRange(value.length, value.length)
    wrapper.trigger('input')
    expect(wrapper.element.value).toBe('0xadde')
  })

  it('emitted input event contains address without space symbols', () => {
    const address = '0x1234512345671234567123456'
    const wrapper = mount(AeAddressInput, { propsData: { value: address } })
    wrapper.trigger('input')
    expect(wrapper.emitted().input[0][0]).toBe(address)
  })

  it('limits address length', () => {
    const wrapper = mount(AeAddressInput)
    const begin = '0x12345 6789012 3456789\n0123F'
    const end = '456 7890123 4567890'
    wrapper.element.value = begin + end
    wrapper.element.setSelectionRange(begin.length, begin.length)
    wrapper.trigger('input')
    expect(wrapper.element.value).toBe(begin + '45 6789012 3456789')
  })
})
