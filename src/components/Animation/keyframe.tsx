export const spin = {
  from: {
    transform: 'rotate(0)'
  },

  to: {
    transform: 'rotate(360deg)'
  }
}

export const SlideUpIn = {
  '0%': {
    transform: 'scaleY(0)',
    transformOrigin: '0% 0%',
    opacity: '0'
  },

  '100%': {
    transform: 'scaleY(1)',
    transformOrigin: '0% 0%',
    opacity: '1'
  }
}

export const SlideUpOut = {
  '0%': {
    transform: 'scaleY(1)',
    transformOrigin: '0% 0%',
    opacity: '1'
  },

  '100%': {
    transform: 'scaleY(0)',
    transformOrigin: '0% 0%',
    opacity: '0'
  }
}

export const FadeIn = {
  '0%': {
    opacity: 0
  },
  '100%': {
    opacity: 1
  }
}

export const FadeOut = {
  '0%': {
    opacity: 1
  },
  '100%': {
    opacity: 0
  }
}

export const BounceIn = {
  '0%': {
    transform: 'scale(.8, .8)',
    transformOrigin: 'center center'
  },
  // '76%': {
  //   transform: 'scale(1.1, 1.1)',
  //   transformOrigin: 'center center'
  // },
  '100%': {
    transform: 'scale(1, 1)',
    transformOrigin: 'center center'
  }
}
