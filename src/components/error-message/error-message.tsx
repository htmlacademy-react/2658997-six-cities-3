type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps): JSX.Element => (
  <div
    role="alert"
    style={{
      marginBottom: '24px',
      padding: '12px 16px',
      borderRadius: '12px',
      backgroundColor: '#fff1f0',
      border: '1px solid #ffccc7',
      color: '#a8071a',
    }}
  >
    {message}
  </div>
);

export default ErrorMessage;
