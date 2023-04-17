import React, { useEffect } from "react";

interface WithLoggingProps {
  message?: string;
}

const withLogging = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & WithLoggingProps> => {
  const WithLogging: React.FC<P & WithLoggingProps> = (props) => {
    useEffect(() => {
      const { message = "Hello from" } = props;
      console.log(
        `${message} ${WrappedComponent.displayName || WrappedComponent.name}`
      );
    }, [props]);

    return <WrappedComponent {...props} />;
  };

  return WithLogging;
};

export default withLogging;
