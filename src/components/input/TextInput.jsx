import React from 'react';
import PropTypes from "prop-types";

const TextInput = ({type, placeholder, labelTitle, required, defaultValue}) => {

    const [value, setValue] = React.useState(defaultValue || "");

    const updateValue = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            {labelTitle
                ? (
                    <>
                        <label className="input input-bordered flex items-center gap-2">
                            {labelTitle}{required ? <sup className={'text-red-600 text-xl -ml-2'}>*</sup> : <></>}
                            <input type={type} value={value}
                                   className="grow" placeholder={placeholder}
                                   onChange={(e) => updateValue(e)}
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
}
export default TextInput;