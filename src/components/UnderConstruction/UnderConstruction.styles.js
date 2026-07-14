import styled from 'styled-components';

export const PageContainer = styled.div`
  height: 100vh;
  background-image: url('/assets/backgrounds/nin-working-background.png');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(11, 14, 20, 0.5); /* Antes era 0.75 */
  backdrop-filter: brightness(0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
`;

export const Content = styled.main`
  max-width: 800px;
  width: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-family: 'Naruto', 'Segoe UI', Tahoma, sans-serif;
  font-size: 3.5rem;
  color: #fff;
  text-shadow: 0 0 30px rgba(0, 191, 255, 0.4);
  margin-bottom: 1rem;

  span {
    color: #ffd700;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.3rem;
  color: #d0d0d0;
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto 2rem auto;
`;

export const Emoji = styled.div`
  font-size: 5rem;
  margin-bottom: 1rem;
`;

export const Message = styled.p`
  font-size: 1rem;
  color: #aaa;
  margin-top: 2rem;
  font-style: italic;
`;