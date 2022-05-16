import Head from 'next/head';
import Contact from "../../components/contact/Contact";

const ContactPage = () => {
  return (
    <div>
      <Head>
        <title>Contact</title>
        <meta name='description' content='Get in contact with us by sending us a message'/>
      </Head>
        <Contact />
    </div>
  )
}

export default ContactPage;