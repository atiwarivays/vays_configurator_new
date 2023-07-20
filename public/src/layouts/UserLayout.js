import {Link, Outlet} from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import {ConfigurationModal} from "../components/modals/ConfigurationModal";
import {useEffect, useState} from "react";

export default function UserLayout() {
    const [openIndentModal, setOpenIndentModal] = useState(false);
    const [exitIntentTriggered, setExitIntentTriggered] = useState(false);

    useEffect(() => {
        const handleExitIntent = (e) => {
            if (e.clientY <= 0 && !exitIntentTriggered) {
                setExitIntentTriggered(true);
                setOpenIndentModal(true);
            }
        };

        window.addEventListener('mouseout', handleExitIntent);

        return () => {
            window.removeEventListener('mouseout', handleExitIntent);
        };
    }, [exitIntentTriggered]);

    return(
        <>
            {openIndentModal === true && (
                <ConfigurationModal
                    modalTitle="Ihre Konfiguration speichern?"
                    button_text="Speichern"
                    modalDescription={[
                        <p>Möchten Sie Ihre Konfiguration abspeichern bevor Sie gehen? Wir senden Ihnen diese dann per Email.</p>,
                    ]}
                    bottomLineIntro={[
                        <p>
                            Indem Sie auf “Konfiguration prüfen lassen” klicken, akzeptieren Sie unsere{" "}
                            <Link to="https://vays.de/datenschutz/" target="_blank">Datenschutzbedingungen</Link>.
                        </p>,
                    ]}
                    closeModal={() => {
                        setOpenIndentModal(!openIndentModal);
                    }}
                />
            )}
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}