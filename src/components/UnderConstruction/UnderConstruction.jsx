import React from 'react';
import {
  PageContainer,
  Overlay,
  Content,
  Title,
  Subtitle,
  Emoji,
  Message,
} from './UnderConstruction.styles';

const UnderConstruction = ({ pageName }) => {
  return (
    <PageContainer>
      <Overlay>
        <Content>
          <Emoji>🚧</Emoji>
          <Title>
            <span>Em Construcao</span>
          </Title>
          <Subtitle>
            A página <strong>{pageName || 'solicitada'}</strong> está sendo desenvolvida.
            <br />
            Em breve, você terá acesso a todo o conteúdo!
          </Subtitle>
          <Message>
            Enquanto isso, explore as outras seções do portal.
          </Message>
        </Content>
      </Overlay>
    </PageContainer>
  );
};

export default UnderConstruction;