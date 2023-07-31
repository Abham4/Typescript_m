import { useState } from "react";
import Signcheck from './Signcheck';

function PasswordAndConfirmPasswordValidation(){

const [passwordError, setPasswordErr] = useState("");
const [confirmPasswordError, setConfirmPasswordError] = useState("");
const [passwordInput, setPasswordInput]= useState({
    password:'',
    confirmPassword:''
})
const [ phoneInput, setPhoneInput ] = useState('');
const [ phoneError, setPhoneError ] = useState('');

const handlePasswordChange =(evnt:any)=>{

    const passwordInputValue = evnt.target.value.trim();
    const passwordInputFieldName = evnt.target.name;
    const NewPasswordInput = {...passwordInput,[passwordInputFieldName]:passwordInputValue}
    setPasswordInput(NewPasswordInput);
    
}
const handlePasswordValidation= (evnt:any)=>{

    const passwordInputValue = evnt.target.value.trim();
    const passwordInputFieldName = evnt.target.name;

        //for password 
if(passwordInputFieldName==='password'){
    const uppercaseRegExp   = /(?=.*?[A-Z])/;
    const lowercaseRegExp   = /(?=.*?[a-z])/;
    const digitsRegExp      = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp   = /.{8,}/;

    const passwordLength =      passwordInputValue.length;
    const uppercasePassword =   uppercaseRegExp.test(passwordInputValue);
    const lowercasePassword =   lowercaseRegExp.test(passwordInputValue);
    const digitsPassword =      digitsRegExp.test(passwordInputValue);
    const specialCharPassword = specialCharRegExp.test(passwordInputValue);
    const minLengthPassword =   minLengthRegExp.test(passwordInputValue);

    let errMsg ="";
    if(passwordLength===0){
            errMsg="Password is empty";
    }else if(!uppercasePassword){
            errMsg="At least one Uppercase";
    }else if(!lowercasePassword){
            errMsg="At least one Lowercase";
    }else if(!digitsPassword){
            errMsg="At least one digit";
    }else if(!specialCharPassword){
            errMsg="At least one Special Characters";
    }else if(!minLengthPassword){
            errMsg="At least minumum 8 characters";
    }else{
        errMsg="";
    }
    setPasswordErr(errMsg);
    }

    // for confirm password
    if(passwordInputFieldName=== "confirmPassword" || (passwordInputFieldName==="password" && passwordInput.confirmPassword.length>0) ){
            
        if(passwordInput.confirmPassword!==passwordInput.password)
        {
        setConfirmPasswordError("Confirm password is not matched");
        }else{
        setConfirmPasswordError("");
        }
        
    }

}

const handlePhoneChange = (event:any) => {
    const phoneInputValue = event.target.value.trim();
    setPhoneInput(phoneInputValue);
}

const handlePhoneValidation = (event:any) => {

    const phoneInputValue = event.target.value.trim();

    const phoneReg = /^(([+]{1}[2]{1}[5]{1}[1]{1})|([0]))([9,7]{1})([\d]{8})$/;

    const check = phoneReg.test(phoneInputValue);

    let errMsg = '';

    if(!check){
        errMsg = 'Invalid Phone'
    }

    else
        errMsg=''
    setPhoneError(errMsg)
}

    return(
    <div className="row">
     <div className="col-sm-4">
         <Signcheck
          handlePasswordChange={handlePasswordChange} 
          handlePasswordValidation={handlePasswordValidation} 
          handlePhoneChange={handlePhoneChange}
          handlePhoneValidation={handlePhoneValidation}
          phoneValue={phoneInput}
          phoneError={phoneError}
          passwordValue={passwordInput.password} 
          passwordError={passwordError}
          confirmPasswordValue={passwordInput.confirmPassword} 
        confirmPasswordError={confirmPasswordError} />
        
     </div>
    </div>
    )
}

export default PasswordAndConfirmPasswordValidation;