
// Components
import Layout from "@/components/Layout";
import BootcampBenefits from "@/components/bootcamp/Benefits/Index";
import BootcampComments from "@/components/bootcamp/Comments/Index";
/* import BootcampContact from "@/components/bootcamp/Contact/Index"; */
import BootcampFAQ from "@/components/bootcamp/FAQ/Index";
import BootcampHero from "@/components/bootcamp/Hero/Index";
import BootcampServices from "@/components/bootcamp/Services/Index";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";
// Mockdata
import comments from "@/mockData/bootcamp/comments";
import faqs from '@/mockData/bootcamp/faqs'

export default function Bootcamp() {

    const { language } = useContextProvider();

    return (
        <Layout title={"Bootcamp"} lang={"es"}>
            <BootcampHero lang={language} />
            <BootcampBenefits lang={language} />
            <BootcampServices lang={language} />
            <BootcampComments comments={comments.es} />
            <BootcampFAQ faqs={faqs.es} />
            {/* <BootcampContact /> */}
        </Layout>
    )
}