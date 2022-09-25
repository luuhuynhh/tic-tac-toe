const { useState } = require("react")

export const useToggle = (initValue) => {
    const [value, setValue] = useState(initValue);
    const toggleValue = () => {
        setValue(pre => !pre);
    }
    return [value, toggleValue];
}