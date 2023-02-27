import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";

export const useAppDisptach: () => AppDispatch = useDispatch;
