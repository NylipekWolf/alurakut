import styled from 'styled-components';

const Box = styled.div`
  background: #100f0f;
  border-radius: 8px;
  padding: 12px;
  /* CSS Pré-Pronto */
  margin-bottom: 10px;
  .boxLink {
    font-size: 14px;
    color: #a57bd4;
    text-decoration: none;
    font-weight: 800;
  }
  .title {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .subTitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
    color: darkgray;
  }
  .smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #333333;
    margin-bottom: 20px;
  }
  h1{
    color: darkgray;
  }
  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ECF2FA;
  }
  input {
    width: 100%;
    background-color: #F4F4F4;
    color: #333333;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 9px;
    ::placeholder {
      color: #333333;
      opacity: 1;
    }
  }
  button {
    border: 0;
    padding: 10px 12px;
    color: #FFFFFF;
    border-radius:15px;
    background-color: #704086;
  }
`; 

export default Box;