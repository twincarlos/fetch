import { useContext } from "react";
import { ParametersContext } from "../../../../context/Parameters";

export default function ResultsPerPage() {
    const {
        searchParams, setSearchParams,
        size, setSize
    } = useContext(ParametersContext);

    return (
        <div className='filter results-per-page'>
            <label>Results per page:</label>
            <p className='puff'>{size}</p>
            <input
                type='range'
                value={size}
                min={1}
                max={25}
                onChange={e => setSize(e.target.value)}
                onMouseUp={e => {
                    searchParams.set('size', e.target.value);
                    setSearchParams(searchParams);
                }}
            />
        </div>
    );
};