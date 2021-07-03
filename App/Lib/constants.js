import { startCase } from 'lodash'

export const IMAGE_OPTIONS = {
  width: 250,
  height: 250,
  cropping: true,
}

export const IMAGE_CONFIGS = {
  width: 300,
  height: 300,
  cropping: true,
}

export const ROLE = {
  REGULAR: 'REGULAR',
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
}

export const GENDER = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
]

export const FILTER_VALUES = {
  FIVE: {
    min: 5,
    max: 6,
  },
  FOUR: {
    min: 4,
    max: 5,
  },
  THREE: {
    min: 3,
    max: 4,
  },
  TWO: {
    min: 2,
    max: 3,
  },
  ONE: {
    min: 1,
    max: 2,
  },
}

export const FILTER = [
  { label: '5 Only', value: 'FIVE' },
  { label: '4 and up', value: 'FOUR' },
  { label: '3 and up', value: 'THREE' },
  { label: '2 and up', value: 'TWO' },
  { label: '1 and up', value: 'ONE' },
]

export const RATE = {
  ONE_STAR: 1,
  TWO_STAR: 2,
  THREE_STAR: 3,
  FOUR_STAR: 4,
  FIVE_STAR: 5,
}

export const MESSAGE_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'danger',
  DEFAULT: 'gray',
}

export const capitalize = text => {
  if (!text?.trim?.()) {
    return text
  }

  text = text?.toLowerCase?.()

  return startCase(text)
}

export const PAGINATION_DEFAULTS = {
  PAGE: 0,
  PAGE_SIZE: 10,
}
