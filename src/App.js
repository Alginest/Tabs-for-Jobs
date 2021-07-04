import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'
function App() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [jobs, setJobs] = useState([])
  const [value, setValue] = useState(0)
  const fetchJobs = async () => {
    try {
      const resp = await fetch(url)
      const newJobs = await resp.json()
      setJobs(newJobs)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(true)
      console.log(error)
    }
  }
  useEffect(() => {
    fetchJobs()
  }, [])
  console.log(jobs)
  if (loading) {
    return (
      <section className='section loading'>
        <h1>Loading...</h1>
      </section>
    )
  }
  if (error) {
    return (
      <section className='section loading'>
        <h1>Error..</h1>
      </section>
    )
  }
  const { title, dates, company, duties } = jobs[value]
  return (
    <section className='section'>
      <div className='title'>
        <h2>expierence</h2>
        <div className='underline'></div>
      </div>
      <div className='jobs-center'>
        {/* btn container*/}
        <div className='btn-container'>
          {jobs.map((item, index) => {
            return (
              <button
                className={`job-btn ${index === value && 'active-btn'}`}
                key={index}
                onClick={() => setValue(index)}
              >
                {item.company}
              </button>
            )
          })}
        </div>
        {/* job info*/}
        <article className='job-info'>
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className='job-date'>{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div className='job-desc' key={index}>
                <FaAngleDoubleRight className='job-icon' />
                <p>{duty}</p>
              </div>
            )
          })}
        </article>
      </div>
    </section>
  )
}

export default App
