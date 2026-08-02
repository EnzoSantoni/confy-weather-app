import ComparePanel from './ComparePanel.jsx'
import { useEffect, useState } from 'react'
import { useWeather } from '../hooks/useWeather.jsx'
import { useSearchHistory } from '../hooks/useSearchHistory.jsx'
import CompareStats from './CompareStats.jsx'
import Footer from './Footer.jsx'

function CompareView () {
    const [city1, setCity1] = useState('')
    const [city2, setCity2] = useState('')
    const {data: data1, forecast: forecast1, loading: loading1, error: error1} = useWeather(city1)
    const {data: data2, forecast: forecast2, loading: loading2, error: error2} = useWeather(city2)
    const {addCity, history, removeCity} = useSearchHistory()



    useEffect(() => {
    if(!data1) return
    addCity(data1.name)
    }, [data1])

    useEffect(() => {
    if(!data2) return
    addCity(data2.name)
    }, [data2])



    return (
        <div className="compare-view-container">
            <section className='compare-hero'>
                <ComparePanel data={data1} forecast={forecast1} loading={loading1} error={error1} onSearch={setCity1} history={history} removeCity={removeCity} side="left"/>
                <ComparePanel data={data2} forecast={forecast2} loading={loading2} error={error2} onSearch={setCity2} history={history} removeCity={removeCity} side="right"/>
            </section>
            {data1 && data2 &&
                <section className='compare-detail'>
                    <CompareStats data1={data1} data2={data2} forecast1={forecast1} forecast2={forecast2}/>
                </section>
            }
            {data1 && data2 &&
                <section className='footer'>
                    <Footer />
                </section>
            }
        </div>
    )
}

export default CompareView