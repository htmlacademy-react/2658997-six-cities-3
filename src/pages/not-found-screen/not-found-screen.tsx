import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundScreen = (): React.ReactElement =>
  (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '100px', color: 'red' }}>404</h1>
      <p style={{ fontSize: '20px' }}>Ой! Страница не найдена!</p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          textDecoration: 'none',
          color: '#654321',
          fontSize: '20px',
          fontWeight: '700',
          border: '1px solid #654321',
          padding: '15px 30px',
          marginTop: '10px',
          borderRadius: '10px'
        }}
      >
        Вернуться на главную
      </Link>
    </div>
  );

export default NotFoundScreen;
