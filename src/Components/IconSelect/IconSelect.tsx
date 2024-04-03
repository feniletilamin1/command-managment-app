import './IconSelect.css';
import Select, { OptionProps, SingleValue, SingleValueProps, components } from 'react-select';
import { IconTypeOption } from '../../Types/SelectTypes';

type IconSelectProps = {
    options: IconTypeOption[]
    placeholder: string,
    handleChange: (selectedOption: SingleValue<IconTypeOption>) => void,
}

export default function IconSelect(props: IconSelectProps) {
    const { options, placeholder, handleChange} = props;
    const { SingleValue, Option } = components;

    const IconSingleValue = (props: SingleValueProps<IconTypeOption>) => (
        <SingleValue {...props}>
            <div className="image-select">
                <img alt="Select Icon" className="image-select__icon" src={props.data.image} />
            </div>
            {props.data.label}
        </SingleValue>
    );

    const IconOption = (props: OptionProps<IconTypeOption>) => (
        <Option {...props}>
            <div className="image-select">
                <img alt="Select Icon" className="image-select__icon" src={props.data.image} />
            </div>
            {props.data.label}
        </Option>
    );

    const customStyles = {
        option: (provided: any) => ({
            ...provided,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            fontFamily: 'Mulish', 
            fontSize: "12"
        }),
        singleValue: (provided: any) => ({
            ...provided,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            fontFamily: 'Mulish', 
            fontSize: "12"
        }),
    }

    return (
        <Select
            noOptionsMessage={() => "Нечего выбирать"} placeholder={placeholder}
            required
            isSearchable
            styles={customStyles}
            components={{SingleValue: IconSingleValue, Option: IconOption}}
            options={options}
            isMulti={false}
            onChange={handleChange}
        />
    )
}