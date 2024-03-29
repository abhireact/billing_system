import MDInput from "components/MDInput";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Cookies from "js-cookie";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import Autocomplete from "@mui/material/Autocomplete";
import MDTypography from "components/MDTypography";
import MDDropzone from "components/MDDropzone";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import { FormControlLabel, FormLabel, RadioGroup } from "@mui/material";
import { useState, useEffect } from "react";
import MDAvatar from "components/MDAvatar";
const token = Cookies.get("token");
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { message } from "antd";
import Checkbox from "@mui/material/Checkbox";

const paymode = ["Cash", "UPI", "Bank Transfer"];
let initialValues = {
  date: "",
  expense_type: "",
  amount: "",
  paid_to: "",
  pay_mode: "",
  payment_ref_no: "",
  paid_by: "",
  remarks: "",
};

const Create = (props: any) => {
  const { setOpen, editData, method } = props;
  const handleClose = () => {
    setOpen(false);
  };
  if (method === "PUT") {
    initialValues = {
      date: editData.date,
      expense_type: editData.expense_type,
      amount: editData.amount,
      paid_to: editData.paid_to,
      pay_mode: editData.pay_mode,
      payment_ref_no: editData.payment_ref_no,
      paid_by: editData.paid_by,
      remarks: editData.remarks,
    };
  } else {
    initialValues = {
      date: "",
      expense_type: "",
      amount: "",
      paid_to: "",
      pay_mode: "",
      payment_ref_no: "",
      paid_by: "",
      remarks: "",
    };
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    // validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      const handleCreateSubmit = async () => {
        let sendData = values;

        await axios
          .post("http://10.0.20.121:8000/expenses", sendData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              console.log("Created Successfully");
              handleClose();
              message.success("Created SuccessFully");
            }
          })
          .catch((error) => {
            console.error(error);
            message.error("Error Occured");
          });
      };
      const handleUpdateSubmit = async () => {
        let sendData = {
          ...values,
          old_date: editData.date,
          old_expense_type: editData.expense_type,
          old_amount: editData.amount,
          old_paid_to: editData.paid_to,
          old_pay_mode: editData.pay_mode,
          old_payment_ref_no: editData.payment_ref_no,
          old_paid_by: editData.paid_by,
          old_remarks: editData.remarks,
        };

        await axios
          .put("http://10.0.20.121:8000/expenses", sendData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              console.log("Created Successfully");
              handleClose();
              message.success("Created SuccessFully");
            }
          })
          .catch((error) => {
            console.error(error);
            message.error("Error Occured");
          });
      };
      if (method === "PUT") {
        handleUpdateSubmit();
      } else {
        handleCreateSubmit();
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        {" "}
        <MDBox p={4}>
          <Grid container>
            <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
              <MDTypography variant="body2" fontWeight="bold" py={2}>
                Expense Details
              </MDTypography>
            </Grid>
            <Grid sm={6} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox>
                <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                  <MDInput
                    variant="standard"
                    type="date"
                    name="date"
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.date && Boolean(errors.date)}
                    helperText={touched.date && errors.date}
                    sx={{ width: "100%" }}
                  />
                </Grid>

                <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                  <MDInput
                    variant="standard"
                    required
                    name="expense_type"
                    label="Expense Type"
                    value={values.expense_type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.expense_type && Boolean(errors.expense_type)}
                    helperText={touched.expense_type && errors.expense_type}
                  />
                </Grid>
                <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                  <MDInput
                    variant="standard"
                    required
                    type="number"
                    name="amount"
                    label="Amount"
                    value={values.amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.amount && Boolean(errors.amount)}
                    helperText={touched.amount && errors.amount}
                  />
                </Grid>
                <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                  <MDInput
                    variant="standard"
                    required
                    name="paid_to"
                    label="Paid To"
                    value={values.paid_to}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.paid_to && Boolean(errors.paid_to)}
                    helperText={touched.paid_to && errors.paid_to}
                  />
                </Grid>
                <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                  <Autocomplete
                    sx={{ width: "100%" }}
                    value={values.pay_mode}
                    onChange={(event, value) => {
                      handleChange({
                        target: { name: "pay_mode", value },
                      });
                    }}
                    options={paymode}
                    renderInput={(params: any) => (
                      <FormField
                        label="Pay Mode"
                        InputLabelProps={{ shrink: true }}
                        name="pay_mode"
                        onChange={handleChange}
                        value={values.pay_mode}
                        {...params}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </MDBox>
            </Grid>

            <Grid sm={6} container sx={{ display: "flex", justifyContent: "center" }}>
              <MDBox>
                <Grid item sm={12}>
                  <MDInput
                    variant="standard"
                    name="payment_ref_no"
                    label="Payment Ref. No."
                    value={values.payment_ref_no}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.payment_ref_no && Boolean(errors.payment_ref_no)}
                    helperText={touched.payment_ref_no && errors.payment_ref_no}
                  />
                </Grid>
                <Grid item sm={12}>
                  <MDInput
                    required
                    variant="standard"
                    name="paid_by"
                    label="Paid By"
                    value={values.paid_by}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.paid_by && Boolean(errors.paid_by)}
                    helperText={touched.paid_by && errors.paid_by}
                  />
                </Grid>
                <Grid item sm={12} pb={1}>
                  <MDInput
                    multiline
                    rows={3}
                    variant="standard"
                    name="remarks"
                    label="Remarks"
                    value={values.remarks}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.remarks && Boolean(errors.remarks)}
                    helperText={touched.remarks && errors.remarks}
                  />
                </Grid>
                <MDButton color="info" type="submit">
                  Submit -&gt;
                </MDButton>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </form>
  );
};

export default Create;
