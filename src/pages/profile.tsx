import Footer from "@/components/footer/footer"

export default function Profile() {

    return (
        <h1>Profile Page Here !</h1>
    )
};

// this fucntion defines page custom layout, page parameter is the above defined page (component) itself
Profile.getLayout =  (page: any)  => {
    return (
        <>
        <h1>Custom per page layout used here</h1>
        <p>THere's no header here, only footer.</p>
        {page}
        <Footer />
        </>
    )
}