import {
  Breadcrumbs,
  Container,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { client } from "./types";
import tokenService from "../service/token.service";

const CreateSavingProduct = () => {
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const [formValue, setformValue] = useState({
    name: "Education Saving",
    shortName: "ES",
    status: "",
    ProductType: "Saving",
    originalLoan: 25,
    loanBalance: 0,
    amountPaid: 0,
  });

  const to = tokenService.getLocalAccessToken();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // make axios post request
    const response = await axios({
      method: "post",
      url: "https://localhost:5001/api/Products",
      data: formValue,
      headers: { Authorization: `Bearer ${to}` },
    })
      .then((response) => {
        // console.warn(response)
        navigate("/Products/Saving");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event: any) => {
    console.log(formValue);
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  console.warn(to);
  return (
    <>
      <Container className="bg-yellow-100 mt-10 mb-20 pb-20 rounded-lg drop-shadow-lg">
        <Breadcrumbs className="p-5" aria-label="breadcrumb">
          <Link color="inherit" to="/" className=" hover:underline">
            Home
          </Link>
          <Link color="inherit" to="/Products" className=" hover:underline">
            Products
          </Link>
          <Typography className="text-black">Create Saving Product</Typography>
        </Breadcrumbs>
        <h1 className="pt-6 pl-16 text-xl font-bold">Saving product</h1>
        <div className="p-12">
          <form onSubmit={handleSubmit}>
            <div className="px-10 grid grid-cols-2 gap-2">
              {/* left */}
              <div className="grid grid-cols-4 gap-2 mr-2">
                <label className="block">
                  <span className="font-serif block text-sm text-lg text-slate-700 ">
                    Product Name{" "}
                  </span>
                </label>

                <input
                  name="name"
                  required
                  type="text"
                  value={formValue.name}
                  onChange={handleChange}
                  className="mt-2 block w-full px-2 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 w-96
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
              col-start-2 col-end-6
            "
                />
                <label className="block">
                  <span className="font-serif block text-sm text-lg text-slate-700 ">
                    Short Name :
                  </span>
                </label>

                <input
                  name="shortName"
                  type="text"
                  required
                  value={formValue.shortName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
              col-start-2 col-end-6
            "
                />

                {/* <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Status :</span></label>
            <input type="text" name='status' value={formValue.status} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
              col-start-2 col-end-6

            "/>  */}
                {/* <label className="block"><span className="font-serif block text-sm text-lg text-slate-700 ">Product Type :</span></label>
            <input type="text" name="ProductType" value={formValue.ProductType} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
              col-start-2 col-end-6

            "/> */}
                <label className="block">
                  <span className="font-serif block text-sm text-lg text-slate-700 ">
                    Amount :
                  </span>
                </label>

                <input
                  name="originalLoan"
                  type="number"
                  min={25}
                  required
                  value={formValue.originalLoan}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500
              col-start-2 col-end-6
            "
                />

                <input
                  type="submit"
                  className="float-right  my-5 bg-[#000] hover:bg-[#ffbb00] hover:text-black text-white font-bold py-2 px-4 border border-blue-700 rounded"
                  value="Create"
                />
              </div>

              {/* right */}
              <div className="grid grid-cols-4 gap-2 mr-2"></div>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default CreateSavingProduct;

// import React, { useState } from "react";
// import {
//   Typography,
//   TextField,
//   Button,
//   Stepper,
//   Step,
//   StepLabel,
// } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";

// import {
//   useForm,
//   Controller,
//   FormProvider,
//   useFormContext,
// } from "react-hook-form";

// const useStyles = makeStyles((theme) => ({
//   button: {
//     marginRight: theme.spacing(1),
//   },
// }));

// function getSteps() {
//   return [
//     " Details",
//     "status",

//   ];
// }
// const Details = () => {
//   const { control } = useFormContext();

//   return (

//     <>
//       <Controller
//         control={control}
//         name="savingname"
//         render={({ field }) => (
//           <TextField
//             id="saving-name"
//             label="saving name"
//             variant="outlined"
//             placeholder="saving name"
//             fullWidth
//             margin="normal"
//             {...field}
//           />
//         )}
//       />

//       <Controller
//         control={control}
//         name="shortname"
//         render={({ field }) => (
//           <TextField
//             id="short-name"
//             label="short name"
//             variant="outlined"
//             placeholder="short name"
//             fullWidth
//             margin="normal"
//             {...field}
//           />
//         )}
//       />

//       <Controller
//         control={control}
//         name="expiredate"
//         render={({ field }) => (
//           <TextField
//             id="expire-date"
//             label="expire date"
//             variant="outlined"
//             placeholder="expire Date"
//             fullWidth
//             margin="normal"
//             {...field}
//           />
//         )}
//       />

//     </>
//   );
// };
// const Status = () => {
//   const { control } = useFormContext();
//   return (
//     <>
//       <Controller
//         control={control}
//         name="status"
//         render={({ field }) => (
//           <TextField
//             id="status"
//             label="status"
//             variant="outlined"
//             placeholder="status"
//             fullWidth
//             margin="normal"
//             {...field}
//           />
//         )}
//       />

//       <Controller
//         control={control}
//         name="savingtype"
//         render={({ field }) => (
//           <TextField
//             id="saving-type"
//             label="saving type"
//             variant="outlined"
//             placeholder="saving type"
//             fullWidth
//             margin="normal"
//             {...field}
//           />
//         )}
//       />

//     </>
//   );
// };

// function getStepContent(step:any) {
//   switch (step) {
//     case 0:
//       return <Details />;

//     case 1:
//       return <Status />;
//     case 2:

//     default:
//       return "unknown step";
//   }
// }

// const LinaerStepper = () => {
//   const classes = useStyles();
//   const methods = useForm({
//     defaultValues: {
//       savingname: "",
//       shortname: "",
//       expiredate: "",
//       status: "",
//       loantype: "",

//     },
//   });
//   const [activeStep, setActiveStep] = useState(0);
//   const [skippedSteps, setSkippedSteps] = useState([]as any);
//   const steps = getSteps();

// //   const isStepOptional = (step:any) => {
// //     return step === 1 || step === 2;
// //   };

//   const isStepSkipped = (step:any) => {
//     return skippedSteps.includes(step);
//   };

//   const handleNext = (data:any) => {
//     console.log(data);
//     if (activeStep == steps.length - 1) {
//       fetch("https://jsonplaceholder.typicode.com/comments")
//         .then((data) => data.json())
//         .then((res) => {
//           console.log(res);
//           setActiveStep(activeStep + 1);
//         });
//     } else {
//       setActiveStep(activeStep + 1);
//       setSkippedSteps(
//         skippedSteps.filter((skipItem:any) => skipItem !== activeStep)
//       );
//     }
//   };

//   const handleBack = () => {
//     setActiveStep(activeStep - 1);
//   };

//   const handleSkip = () => {
//     if (!isStepSkipped(activeStep)) {
//       setSkippedSteps([...skippedSteps, activeStep]);
//     }
//     setActiveStep(activeStep + 1);
//   };

//   // const onSubmit = (data) => {
//   //   console.log(data);
//   // };
//   return (
//     <div>
//       <Stepper alternativeLabel activeStep={activeStep}>
//         {steps.map((step, index) => {
//           const labelProps = {} as any;
//           const stepProps = {} as any;
//         //   if (isStepOptional(index)) {
//         //     labelProps.optional = (
//         //       <Typography
//         //         variant="caption"
//         //         align="center"
//         //         style={{ display: "block" }}
//         //       >
//         //         optional
//         //       </Typography>
//         //     );
//         //   }
//           if (isStepSkipped(index)) {
//             stepProps.completed = false;
//           }
//           return (
//             <Step {...stepProps} key={index}>
//               <StepLabel {...labelProps}>{step}</StepLabel>
//             </Step>
//           );
//         })}
//       </Stepper>

//       {activeStep === steps.length ? (
//         <Typography variant="h3" align="center">
//           Thank You
//         </Typography>
//       ) : (
//         <>
//           <FormProvider {...methods}>
//             <form onSubmit={methods.handleSubmit(handleNext)}>
//               {getStepContent(activeStep)}

//               <Button
//                 className={classes.button}
//                 disabled={activeStep === 0}
//                 onClick={handleBack}
//               >
//                 back
//               </Button>
//               {/* {isStepOptional(activeStep) && (
//                 <Button
//                   className={classes.button}
//                   variant="contained"
//                   color="primary"
//                   onClick={handleSkip}
//                 >
//                   skip
//                 </Button>
//               )} */}
//               <Button
//                 className={classes.button}
//                 variant="contained"
//                 color="primary"
//                 // onClick={handleNext}
//                 type="submit"
//               >
//                 {activeStep === steps.length - 1 ? "Finish" : "Next"}
//               </Button>
//             </form>
//           </FormProvider>
//         </>
//       )}
//     </div>
//   );
// };

// export default LinaerStepper;
