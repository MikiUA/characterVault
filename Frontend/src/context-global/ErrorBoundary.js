import React from "react";
import { ErrorOverlay } from "components/components-general/Overlay";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { Error: error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    // You can render any custom fallback UI
    if (this.state.Error) return(
        <ErrorOverlay error={this.state.Error}/>
    )
    return this.props.children; 
  }
}

export default ErrorBoundary