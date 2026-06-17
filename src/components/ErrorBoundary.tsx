import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = "Something went wrong. Please try refreshing the page.";
      
      try {
        // Check if it's a Firestore error JSON we threw
        const errorData = JSON.parse(this.state.error?.message || '');
        if (errorData.operationType) {
          errorMessage = `Permission denied while performing ${errorData.operationType} on ${errorData.path || 'unknown path'}. Please ensure you have the correct permissions.`;
        }
      } catch (e) {
        // Not a Firestore JSON error
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-accent p-6">
          <div className="max-w-md w-full bg-white rounded-[2rem] p-12 shadow-2xl border-8 border-white text-center">
            <div className="w-20 h-20 bg-krishnachura/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🛑</span>
            </div>
            <h1 className="text-2xl font-black text-primary uppercase tracking-widest mb-4">Access Restricted</h1>
            <p className="text-primary/60 font-medium mb-8">
              {errorMessage}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-primary text-white rounded-xl font-black uppercase tracking-widest hover:bg-primary/90 transition-all"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
