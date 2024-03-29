import { useState } from "react"
// import Select from "react-tailwindcss-select";


function SelectInput({ labelTitle, labelStyle, options, type, containerStyle, defaultValue, placeholder, updateFormValue, updateType }) {

    const [value, setValue] = useState(defaultValue)

    const updateInputValue = (val) => {
        setValue(val)
        updateFormValue({ updateType, value: val })
    }

    return (
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
            </label>
            <select className="select select-bordered w-full" value={value} onChange={(e) => updateInputValue(e.target.value)}>
           
                {
                    options.map((o, k) => {
                        return <option value={o.value || o.label} key={k}>{o.label}</option>
                    })
                }
            </select>
        </div>
    )
}


export default SelectInput

// containerClassName="w-72"
//               value={dateValue}
//               theme={"light"}
//               inputClassName="input input-bordered w-72"
//               popoverDirection={"down"}
//               toggleClassName="invisible"
//               onChange={handleDatePickerValueChange}
//               showShortcuts={true}
//               primaryColor={"white"}

{/* <Datepicker
              containerClassName="w-72"
              value={dateValue}
              theme={"light"}
              inputClassName="input input-bordered w-72"
              popoverDirection={"down"}
              toggleClassName="invisible"
              onChange={handleDatePickerValueChange}
              showShortcuts={true}
              primaryColor={"white"}
            /> */}