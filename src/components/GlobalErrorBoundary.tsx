import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Global error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
          <div className="max-w-lg text-center">
            <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
            <p className="text-white/70 mb-6">
              We're sorry, but something unexpected happened. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-brand-red/90"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
