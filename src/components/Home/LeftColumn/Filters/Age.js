import { useContext } from "react";
import { ParametersContext } from "../../../../context/Parameters";

export default function Age() {
    const {
        searchParams, setSearchParams,
        minAgeInput, setMinAgeInput,
        maxAgeInput, setMaxAgeInput
    } = useContext(ParametersContext);

    function setAgeParameters() {
        searchParams.set('ageMin', minAgeInput);
        searchParams.set('ageMax', maxAgeInput);
        setSearchParams(searchParams);
    };

    function clearAgeParameters() {
        searchParams.delete('ageMin');
        searchParams.delete('ageMax');
        setMinAgeInput('0');
        setMaxAgeInput('20');
        setSearchParams(searchParams);
    };

    return (
        <div className='filter age-filters'>
            <div>
                <label>Min age:</label>
                <input
                    className='puff'
                    min={0}
                    max={Number(maxAgeInput)}
                    type='number'
                    value={minAgeInput}
                    onChange={e => setMinAgeInput(e.target.value)}
                />
            </div>
            <div>
                <label>Max age:</label>
                <input
                    className='puff'
                    min={Number(minAgeInput)}
                    max={20}
                    type='number'
                    value={maxAgeInput}
                    onChange={e => setMaxAgeInput(e.target.value)}
                />
            </div>
            <div>
                <button onClick={setAgeParameters}>
                    <span className="material-symbols-outlined">
                        done
                    </span>
                    Set age
                </button>
                <button onClick={clearAgeParameters}>
                    <span className="material-symbols-outlined">
                        restart_alt
                    </span>
                    Clear filter
                </button>
            </div>
        </div>
    );
};