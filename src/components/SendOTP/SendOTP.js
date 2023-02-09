import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import '../Signup/Signup.css';
import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";


const App = () => {
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);


    function onCaptchVerify() {
        debugger
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: (response) => {
                        onSignup();
                    },
                    "expired-callback": () => { },
                },
                auth
            );
        }
    }

    function onSignup() {
        setLoading(true);
        onCaptchVerify();
        const appVerifier = window.recaptchaVerifier;

        const formatPh = "+" + ph;

        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOTP(true);
                toast.success("OTP sended successfully!");
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }

    function onOTPVerify() {
        setLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                console.log(res);
                setUser(res.user);
                
                setLoading(false);
                navigates("/home");

            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }
    const navigates = useNavigate();
    const handleSubmission = () => {
        navigates("/");
    }

    return (
        <div className="container">
            <div className="innerBox">
                <Toaster toastOptions={{ duration: 4000 }} />
                <div id="recaptcha-container"></div>
                {/* {user ? (
                    <>
                        <div className="footer">
                            <button
                                onClick={handleSubmission}
                            >
                                Signup
                            </button>
                        </div>
                    </>



                ) : ( */}
                    <div >
                        <h2 className="mb-6">
                                Verify your phone number
                        </h2>
                        {showOTP ? (
                            <>
                               
                                <h5
                                    htmlFor="otp"
                                    className="font-bold text-xl text-white text-center"
                                >
                                    Enter your OTP
                                </h5>
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    OTPLength={6}
                                    otpType="number"
                                    disabled={false}
                                    autoFocus
                                    className="opt-container "
                                ></OtpInput>
                                 <div className="footer" style={{marginTop:'10px',marginLeft:'20px',width:'86%'}}>
                                <button
                                    onClick={onOTPVerify}
                                    className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                                >
                                    {loading && (
                                        <CgSpinner size={20} className="mt-1 animate-spin" />
                                    )}
                                    <span>Verify OTP</span>
                                </button>
                                </div>
                            </>
                        ) : (
                            <>
                               
                            <PhoneInput country={"in"} value={ph} onChange={setPh} />
                                <div className="footer" style={{marginTop:'10px',width:'86%'}}>
                                    <button
                                        onClick={onSignup}
                                    >
                                        {loading && (
                                            <CgSpinner size={20} className="mt-1 animate-spin" />
                                        )}
                                        <span>Send code via SMS</span>
                                    </button>
                                </div>

                            </>
                        )}
                    </div>
                {/* )} */}
            </div>
        </div >
    );
};

export default App;