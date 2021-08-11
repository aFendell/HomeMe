
export function About() {

    return (
        <div className="about-page flex column align-center">

            <h1>About HomeMe</h1>
            <h4>HomeMe is the new best way to find your next vaction.</h4>
            <br />
            <p>
                The website uses the lates technologys such as ReactJS, Sockets-io , NodeJS MongoDB and more.
            </p>
            <h3>Meet the HomeMe crew</h3>
            <div className="about-us">
                <p>We both graduated Coding Academy bootcamp as Full Stack Developers.
                    <br />
                </p>
                <p>This is our final project from the course.
                </p>
            </div>
            <div className="us-container flex">
                <div className="kasps flex align-center column">
                    <h4>Assaf Fendell</h4>
                    <ul className="social-nav justify-content ">
                        {/* <a className="fa gmail " href=" https://mail.google.com/mail/?view=cm&fs=1&to=aylambo@gmail.com" target="_blank "> </a> */}
                        <a className="fa linkedin " href="https://www.linkedin.com/in/assaf-fendell-21629a111/" target="_blank "> </a>
                        <a className="fa github " href="https://github.com/aFendell/ " target="_blank "> </a>
                    </ul>
                    <div className="a-fendell">

                    </div>
                </div>
                <div className="kasps flex align-center column">
                    <h4>Aylam Bar-On</h4>
                    <ul className="social-nav justify-content ">
                        {/* <a className="fa gmail " href=" https://mail.google.com/mail/?view=cm&fs=1&to=aylambo@gmail.com" target="_blank "> </a> */}
                        <a className="fa linkedin " href="https://www.linkedin.com/in/aylam-bar-on-5860b169/" target="_blank "> </a>
                        <a className="fa github " href="https://github.com/Aylambo/ " target="_blank "> </a>
                    </ul>
                    <div className="a-baron"></div>
                </div>
            </div>


        </div>
    )
}