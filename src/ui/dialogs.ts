import Swal from "sweetalert2";
import "./dialogs.scss";
export const showSuccessDialog = (title: string, text: string) => {
  return Swal.fire({
    title,
    text,
    icon: "success",
    position: "top-end",
    showConfirmButton: false,
    width: 400,
    timer: 1500,
    customClass: {
      popup: 'custom-font-size'
    }
  });
  
};
export const showErrorDialog = (title: string, text: string) => {
  return Swal.fire({
    title,
    text,
    icon: "error",
    position: "top-end",
    showConfirmButton: false,
    width: 400,
    timer: 1500,
    customClass: {
      popup: 'custom-font-size'
    }
  });
};
export const ifDialog = (title: string, text: string) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });
}

const dialogs = { success: showSuccessDialog, error: showErrorDialog , ifDialog: ifDialog};
export default dialogs;


