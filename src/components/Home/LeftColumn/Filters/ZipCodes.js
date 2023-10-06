import { useContext } from "react";
import { ParametersContext } from "../../../../context/Parameters";

export default function ZipCodes() {
    const {
        searchParams, setSearchParams,
        zipCodeInput, setZipCodeInput,
        zipCodes, setZipCodes
    } = useContext(ParametersContext);

    function addZipCode() {
        const zipCodeQuery = searchParams.get('zipCodes')?.split(',');
        if (!zipCodeQuery) {
            searchParams.set('zipCodes', [zipCodeInput]);
            setZipCodes([...zipCodes, zipCodeInput]);
            setSearchParams(searchParams);
            setZipCodeInput('');
        }
        else if (zipCodeQuery.includes(zipCodeInput) === false) {
            searchParams.set('zipCodes', [...zipCodeQuery, zipCodeInput]);
            setZipCodes([...zipCodes, zipCodeInput]);
            setSearchParams(searchParams);
            setZipCodeInput('');
        };
    };

    function clearZipCodes() {
        setZipCodes([]);
        searchParams.delete('zipCodes');
        setSearchParams(searchParams);
        setZipCodeInput('');
    };

    function removeZipCode(zipCode) {
        const zipCodeQuery = searchParams.get('zipCodes').split(',');
        const indexOfZipCode = zipCodeQuery.indexOf(zipCode);
        const zipCodesParams = [...zipCodeQuery.slice(0, indexOfZipCode), ...zipCodeQuery.slice(indexOfZipCode + 1)];
        const indexOfZipCodeState = zipCodes.indexOf(zipCode);
        setZipCodes([...zipCodes.slice(0, indexOfZipCodeState), ...zipCodes.slice(indexOfZipCode + 1)]);
        if (zipCodesParams.length > 0) {
            searchParams.set('zipCodes', zipCodesParams);
        } else {
            searchParams.delete('zipCodes');
        };
        setSearchParams(searchParams);
    };

    return (
        <>
            <div className='filter zip-codes'>
                <div className='zip-code-filter'>
                    <label>Enter Zip code:</label>
                    <input
                        className='puff'
                        type='number'
                        placeholder='Zip code'
                        value={zipCodeInput}
                        onChange={e => e.target.value.length <= 5 && setZipCodeInput(e.target.value)}
                    />
                </div>
                <div className='zip-code-buttons'>
                    <button onClick={addZipCode}>
                        <span className="material-symbols-outlined">
                            add_location_alt
                        </span>
                        Add zip code
                    </button>
                    <button disabled={zipCodes.length === 0} onClick={clearZipCodes}>
                        <span className="material-symbols-outlined">
                            location_off
                        </span>
                        Clear zip codes
                    </button>
                </div>
            </div>
            {
                zipCodes.length > 0 &&
                <div className='zip-codes-list'>
                    <span className="material-symbols-outlined">
                        location_on
                    </span>
                    {
                        zipCodes.map(zipCode => (
                            <div className='zip-code-container' key={zipCode} onClick={() => removeZipCode(zipCode)}>
                                {zipCode}
                            </div>
                        ))
                    }
                </div>
            }
        </>
    );
};