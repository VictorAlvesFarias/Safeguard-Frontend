import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function useErrors(error: any) {
  try {
    const errors = error.response.data.errors

    if (Array.isArray(errors)) {
      errors.forEach(e => toast.error(e))
    }
    else {
      const keys = Object.keys(errors);
      const values = keys.map((key) => errors[key]);

      values.flatMap((item: any) => {
        return item.map((error: any) => toast.error(error));
      });
    }
  } catch (error) {
    toast.error("Ocorreu um erro desconhecido.");
  }
}

export {
  useErrors
}
