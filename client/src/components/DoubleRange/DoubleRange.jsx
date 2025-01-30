import { useState } from "react";

export default function DoubleRangeSlider({ name, min = 0, max = 5000, value = [min, max], unit = '', onValueChange }) {
    const [minValue, setMinValue] = useState(100);
    const [maxValue, setMaxValue] = useState(900);

    const handleMinChange = (e) => {
        const newMin = parseInt(e.target.value);
        if (newMin < maxValue - 50) {
            setMinValue(newMin);
            console.log(e.target.name, e.target.value)
            onValueChange({ target: { name, value: [newMin, maxValue] } });

        }


    };

    const handleMaxChange = (e) => {
        const newMax = parseInt(e.target.value);
        if (newMax > minValue + 50) {
            setMaxValue(newMax);
            onValueChange({ target: { name, value: [minValue, newMax] } });
        }
    };

    return (
        <div>
            <label>{minValue}{unit} - {maxValue}{unit}</label>
            {/* <div className="slider-container">
                <input type="range" min={min} max={max} step="50" value={minValue} onChange={handleMinChange} />
                <input type="range" min={min} max={max} step="50" value={maxValue} onChange={handleMaxChange} />
            </div> */}
            <div className="slider-container">
                {/* Barra di sfondo */}
                <div className="track"></div>
                {/* Barra colorata tra i due pallini */}
                <div
                    className="range"
                    style={{
                        left: `${((minValue - min) / (max - min)) * 100}%`,
                        width: `${((maxValue - minValue) / (max - min)) * 100}%`,
                    }}
                ></div>

                {/* Slider Min */}

                <input type="range" min={min} max={max} step="50" value={minValue} onChange={handleMinChange} />
                {/* Slider Max */}
                <input type="range" className="max" min={min} max={max} step="50" value={maxValue} onChange={handleMaxChange} />
            </div>


        </div>
    );
}

