import SearchForm from "./SearchForm"

const Hero = () => {
  return (
    <section className="primary_container">
      <h1 className="heading">
        Tell Your Story, <br />
        Where Stories Begin
      </h1>

      <p className="sub-heading !max-w-3xl">
        Express Your Creativity, Share Your Journey, and Inspire Others.
      </p>

      <SearchForm />
    </section >
  )
}

export default Hero
