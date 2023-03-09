export interface IRegisterError {
  error: {
    type: "warning" | "success" | "error" | "information" | null;
    code: number;
    message: string;
  };
}
export interface IActivateAccError {
  error: {
    type: "warning" | "success" | "error" | "information" | null;
    code: number;
    message: string;
  };
}

export interface ILoginError {
  error: {
    type: "warning" | "success" | "error" | "information" | null;
    code: number;
    message: string;
  };
}

export interface IInternalServerError {
  error: {
    type: "error" | null;
    code: number;
    message: string;
  };
}
