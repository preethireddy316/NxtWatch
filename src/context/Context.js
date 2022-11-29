import React from 'react'

const Context = React.createContext({
  isDarkTheme: true,
  savedList: [],
  onChangeTheme: () => {},
  onSaveVideo: () => {},
})

export default Context
