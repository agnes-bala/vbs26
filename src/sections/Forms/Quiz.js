import React from "react";
import "../../App.css";
import {
  Button,
  Stack,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormHelperText,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";

const data = [
  {
    day: "Day 1",
    grade: "Primary",
    q_id: "1",
    q1: "Question 2",
    op_1: "Option 2",
    op_2: "Option 3",
    op_3: "Option 4",
    op_4: "Option 5",
    corrrectAnswer: "Option 3",
  },
  {
    day: "Day 1",
    grade: "Primary",
    q_id: "2",
    q1: "Question 2",
    op_1: "Option 2",
    op_2: "Option 3",
    op_3: "Option 4",
    op_4: "Option 5",
    corrrectAnswer: "Option 2",
  },
  {
    day: "Day 1",
    grade: "Primary",
    q_id: "3",
    q1: "Question 3",
    op_1: "Option 2",
    op_2: "Option 3",
    op_3: "Option 4",
    op_4: "Option 5",
    corrrectAnswer: "Option 4",
  },
  {
    day: "Day 1",
    grade: "Primary",
    q_id: "4",
    q1: "Question 4",
    op_1: "Option 2",
    op_2: "Option 3",
    op_3: "Option 4",
    op_4: "Option 5",
    corrrectAnswer: "Option 5",
  },
];

export default function QuizForm() {
  // const [time, setTime] = useState({
  //   time: "",
  // });
  // const Timer = () => {
  //   const [seconds, setSeconds] = useState(0);
  //   const [minutes, setMinutes] = useState(0);
  //   var timer;
  //   // useEffect(()=>(

  //   // ))
  // };

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    city: "",
    district: "",
    mobile: "",
    whatsapp: "",
    Q1: "",
  });
  const [currentStep, setCurrentStep] = useState(0);

  const makeRequest = (formData) => {
    console.log("Form Submitted", formData);
  };

  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      makeRequest(newData);
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <Step1 next={handleNextStep} data={data} />,
    <Step2 next={handleNextStep} prev={handlePrevStep} data={data} />,
    <Step3 next={handleNextStep} prev={handlePrevStep} data={data} />,
    <Step4 next={handleNextStep} prev={handlePrevStep} data={data} />,
  ];
  console.log("data", data);

  return <div className="App">{steps[currentStep]}</div>;
}
const step1ValidationSchema = Yup.object({
  Q1: Yup.string().required("Please choose any answer"),
});
const Step1 = (props) => {
  const handleSubmit = (values) => {
    props.next(values);
  };
  return (
    <Formik
      validationSchema={step1ValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, getFieldProps, setFieldValue }) => (
        <Form>
          {data.length}
          <FormControl>
            <FormLabel>Q1</FormLabel>
            <RadioGroup
              name="Q1"
              onChange={(e) => {
                setFieldValue("Q1", e.currentTarget.value);
              }}
              {...getFieldProps("Q1")}
              error={touched.Q1 && errors.Q1}
            >
              <FormControlLabel
                value="1"
                className="option"
                control={<Radio />}
                label={
                  <Box component="div" fontSize={25}>
                    This is the first option for the question number 1
                  </Box>
                }
              />
              <FormControlLabel
                value="2"
                className="option"
                control={<Radio />}
                label={
                  <Box component="div" fontSize={25}>
                    This is the first option for the question number 2
                  </Box>
                }
              />
              <FormControlLabel
                value="3"
                className="option"
                control={<Radio />}
                label={
                  <Box component="div" fontSize={25}>
                    This is the first option for the question number 3
                  </Box>
                }
              />
              <FormControlLabel
                value="4"
                className="option"
                control={<Radio />}
                label={
                  <Box component="div" fontSize={25}>
                    This is the first option for the question number 4
                  </Box>
                }
              />
            </RadioGroup>
            <FormHelperText error>{touched.Q1 && errors.Q1}</FormHelperText>
          </FormControl>
          <Stack direction={"row"} justifyContent="center">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              component="span"
              sx={{ p: 2 }}
            >
              <Button variant="contained" color="success" type="submit">
                Next
              </Button>
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

const step2ValidationSchema = Yup.object({
  city: Yup.string().min(3).max(30).required("*City is required").label("City"),
  district: Yup.string()
    .min(3)
    .max(30)
    .required("*District is required")
    .label("District"),
});
const Step2 = (props) => {
  const handleSubmit = (values) => {
    props.next(values);
  };
  return (
    <Formik
      validationSchema={step2ValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, getFieldProps, formikProps }) => (
        <Form>
          <TextField
            name="city"
            label="City"
            {...getFieldProps("city")}
            error={Boolean(touched.city && errors.city)}
            helperText={touched.city && errors.city}
          />
          <br></br>
          <br></br>
          <TextField
            name="district"
            label="District"
            {...getFieldProps("district")}
            error={Boolean(touched.district && errors.district)}
            helperText={touched.district && errors.district}
          />
          <br></br>
          <Stack direction={"row"} justifyContent="center">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              component="span"
              sx={{ p: 2 }}
            >
              <Button
                variant="contained"
                color="success"
                type="button"
                onClick={() => props.prev(formikProps)}
              >
                Back
              </Button>
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              component="span"
              sx={{ p: 2 }}
            >
              <Button variant="contained" color="success" type="submit">
                Next
              </Button>
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
const step3ValidationSchema = Yup.object({
  mobile: Yup.number()
    .required("*Mobile number is required")
    .min(6001000000, "Invaid mobile number")
    .max(9999000000, "Invaid mobile Number"),
  whatsapp: Yup.number()
    .required("*Mobile number is required")
    .min(6001000000, "Invaid mobile Number")
    .max(9999000000, "Invaid mobile Number"),
});
const Step3 = (props) => {
  const handleSubmit = (values) => {
    props.next(values);
  };
  return (
    <Formik
      validationSchema={step3ValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, getFieldProps, formikProps }) => (
        <Form>
          <TextField
            name="mobile"
            label="Mobile Number"
            {...getFieldProps("mobile")}
            error={Boolean(touched.mobile && errors.mobile)}
            helperText={touched.mobile && errors.mobile}
          />
          <br></br>
          <br></br>
          <TextField
            name="whatsapp"
            label="Whatsapp Number"
            {...getFieldProps("whatsapp")}
            error={Boolean(touched.whatsapp && errors.whatsapp)}
            helperText={touched.whatsapp && errors.whatsapp}
          />
          <br></br>

          <Stack direction={"row"} justifyContent="center">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              component="span"
              sx={{ p: 2 }}
            >
              <Button
                variant="contained"
                color="success"
                type="button"
                onClick={() => props.prev(formikProps)}
              >
                Back
              </Button>
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              component="span"
              sx={{ p: 2 }}
            >
              <Button variant="contained" color="success" type="submit">
                Next
              </Button>
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
const step4ValidationSchema = Yup.object({
  email: Yup.string()
    .min(3)
    .max(30)
    .required("*Email is required")
    .email()
    .label("Email"),
  password: Yup.string()
    .min(3)
    .max(30)
    .required("*Password is required")
    .label("Password"),
});
const Step4 = (props) => {
  const handleSubmit = (values, actions) => {
    props.next(values, true);
    alert(JSON.stringify(values, null, 2));
    //  actions.resetForm({values: ''});
  };
  return (
    <Formik
      validationSchema={step4ValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, getFieldProps, values }) => (
        <Form>
          <TextField
            name="email"
            label="Email"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <br></br>
          <br></br>
          <TextField
            name="password"
            label="Password"
            {...getFieldProps("password")}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <br></br>
          <br></br>
          <br></br>
          {/* <TextField
            name="time"
            label="Time" 
          
          // {...getFieldProps("time")}
          //   error={Boolean(touched.email && errors.time)}
          //   helperText={touched.email && errors.time} 
          /> */}
          <br></br>
          <br></br>
          <Stack direction={"row"} justifyContent="center">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              component="span"
              sx={{ p: 2 }}
            >
              <Button
                variant="contained"
                color="success"
                type="button"
                onClick={() => props.prev(values)}
              >
                Back
              </Button>
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              component="span"
              sx={{ p: 2 }}
            >
              <Button variant="contained" color="success" type="submit">
                Submit
              </Button>
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
