
import { useState, useEffect } from "react";
import { 
  Toast,
  ToastActionElement,
  ToastProps
} from "@/components/ui/toast";

type ToasterToast = ToastProps & {
  id: string;
  title?: string;
  description?: string;
  action?: ToastActionElement;
};

const TOAST_LIMIT = 20;
const TOAST_REMOVE_DELAY = 3000; // Reduced from 1000000 to 3000ms (3 seconds)

type ToastOptions = Omit<ToasterToast, "id">;

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function generateId() {
  return (++count).toString();
}

// State management
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

type ActionType = typeof actionTypes;
type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: string;
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: string;
    };

interface State {
  toasts: ToasterToast[];
}

const toastState: State = { toasts: [] };

let listeners: ((state: State) => void)[] = [];

function dispatch(action: Action) {
  toastState.toasts = reducer(toastState.toasts, action);
  listeners.forEach((listener) => {
    listener(toastState);
  });
}

function reducer(state: ToasterToast[], action: Action): ToasterToast[] {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return [action.toast, ...state].slice(0, TOAST_LIMIT);

    case actionTypes.UPDATE_TOAST:
      return state.map((t) =>
        t.id === action.toast.id ? { ...t, ...action.toast } : t
      );

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return state.map((t) =>
        t.id === toastId || toastId === undefined
          ? {
              ...t,
              open: false,
            }
          : t
      );
    }

    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return [];
      }
      return state.filter((t) => t.id !== action.toastId);
    default:
      return state;
  }
}

function addToRemoveQueue(toastId: string) {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: actionTypes.REMOVE_TOAST,
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
}

function useToast() {
  const [state, setState] = useState<State>(toastState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  };
}

function toast(props: ToastOptions) {
  const id = generateId();

  const update = (props: ToastOptions) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: { ...props, id },
    });

  const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

export { useToast, toast };
