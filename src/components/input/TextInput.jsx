import React from 'react';
import PropTypes from "prop-types";

const TextInput = ({type, placeholder, labelTitle, required, defaultValue, setState, target}) => {

    const [value, setValue] = React.useState(defaultValue);

    const handleChangeValue = (e) => {
        setState((prev) => ({ ...prev, [target]: e.target.value }));
        setValue(e.target.value);
    };

    return (
        <>
            {labelTitle
                ? (
                    <>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">
                                    {labelTitle}{required ? <sup className={'text-red-600 text-xl'}>*</sup> : <></>}
                                </span>
                            </div>
                            <input type={type} value={value}
                                   className="input input-bordered w-full" placeholder={placeholder}
                                   onChange={(e) => handleChangeValue(e)}
                            />
                        </label>
                    </>
                )
                : (
                    <>
                        <input type="text"
                               placeholder="Type here"
                               className="input input-bordered w-full max-w-xs"
                        />
                    </>
                )
            }
        </>

    );
};

TextInput.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    labelTitle: PropTypes.string,
    defaultValue : PropTypes.string,
    required: PropTypes.bool,
    setState: PropTypes.func,
    target: PropTypes.string,
}
export default TextInput;