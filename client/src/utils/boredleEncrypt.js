const boredleCode = [
  {
    letter: 'a',
    code: 'g'
  },
  {
    letter: 'b',
    code: 'Z'
  },
  {
    letter: 'c',
    code: '@'
  },
  {
    letter: 'd',
    code: '!'
  },
  {
    letter: 'e',
    code: 'h'
  },
  {
    letter: 'f',
    code: 'f'
  },
  {
    letter: 'g',
    code: '*'
  },
  {
    letter: 'h',
    code: '{'
  },
  {
    letter: 'i',
    code: '<'
  },
  {
    letter: 'j',
    code: 'D'
  },
  {
    letter: 'k',
    code: 'L'
  },
  {
    letter: 'l',
    code: '&'
  },
  {
    letter: 'm',
    code: 'x'
  },
  {
    letter: 'n',
    code: 'W'
  },
  {
    letter: 'o',
    code: '/'
  },
  {
    letter: 'p',
    code: 'a'
  },
  {
    letter: 'q',
    code: '>'
  },
  {
    letter: 'r',
    code: '^'
  },
  {
    letter: 's',
    code: 'r'
  },
  {
    letter: 't',
    code: 'Y'
  },
  {
    letter: 'u',
    code: 'k'
  },
  {
    letter: 'v',
    code: '#'
  },
  {
    letter: 'w',
    code: 'c'
  },
  {
    letter: 'x',
    code: 'V'
  },
  {
    letter: 'y',
    code: 'B'
  },
  {
    letter: 'z',
    code: 'q'
  }
]

export const cryptBoredle = (letter) => {
  const thisLetter = boredleCode.filter((obj) => obj.letter === letter)
  return thisLetter[0].code
}
