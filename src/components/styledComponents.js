import styled from 'styled-components'

export const Cont = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#f9f9f9')};

  color: ${props => (props.isDarkTheme ? '##f9f9f9' : '#181818')};
`

export const BannerCont = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  height: 100vh;
  color: #181818;
`

export const Button3 = styled.button`
  color: ${props => (props.inSavedList ? '#2563eb' : '#64748b')};
`

export const Button1 = styled.button`
  color: ${props => (props.isLiked ? '#2563eb' : '#64748b')};
`
export const Button2 = styled.button`
  color: ${props => (props.isDisliked ? '#2563eb' : '#64748b')};
`

export const LoginButton = styled.button`
  color: #ffff;
`
