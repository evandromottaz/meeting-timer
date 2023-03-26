import styled from 'styled-components';

export const Container = styled.nav`
  width: fit-content;
  height: 100vh;
  border-right: 1px solid #1F1F22;
  transition: .3s;
  position: absolute;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1.5rem;
  width: max-content;
`;

export const Item = styled.li`
  background-color: transparent;
  /* background-color: #1F1F22; */
  border-radius: 16px;
  list-style: none;
`;

export const Button = styled.button`
  color: #C8BCF6;
  text-align: left;
  padding: 1rem;
  font-size: 1rem;
`;