// components/MyDocument.js

import React from 'react';
import {Document, Page, Text, View, StyleSheet, Image} from '@react-pdf/renderer';
import {blob} from "node:stream/consumers";

// Create styles
const styles = StyleSheet.create({
    page: {
        width: 100,
        backgroundColor: '#002E5A',
        opacity: 1,
        position: 'absolute',
        top: '0px',
        left: '0px',
        overflow: 'hidden',
    },
    section: {
        flexDirection: 'column',
        alignItems: 'center',
        margin: 10,
        padding: 20,
        flexGrow: 1,
        color: '#FFFFFF',
        border: '1px solid #FFFFFF',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '40%',
        height: '40%',
        zIndex: -1,
    },
    blurb_certificate: {
        // fontFamily: 'Montserrat',
        fontWeight: 'ultrabold',
        fontSize: '40px',
    },
    blurb_of_contribution: {
        fontWeight: 'ultralight',
        fontSize: '30px',
        marginBottom: '20px'
    },
    name: {
        fontWeight: 'ultrabold',
        fontSize: '30px',
        marginBottom: '20px'
    },
    blurb_this_is_to: {
        fontWeight: "ultralight",
        fontSize: '14px'
    },
    paragraph: {
        fontWeight: 'ultralight',
        fontSize: '12px',
        marginTop: '20px',
        marginBottom: '20px'
    },
    highlight: {
        fontWeight: 'bold'
    },
    header: {
        position: 'relative'
    },
    signature: {
        width: '100px',
        height: '100px',
        position: 'absolute',
        top: '640px'
    },
    ceo: {
        fontSize: '14px',
        fontWeight: 'semibold'
    }
});

// Create Document Component
interface ContributionCertificateProps {
    contributor: string,
    contribution: string,
    token_amount: string,
    wallet: string
}

const MyDocument = ({ contributor, contribution, token_amount, wallet }: ContributionCertificateProps) => (
    <>
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Image style={styles.header} src={'./images/v11_15.png'}/>
                    <Text style={styles.blurb_certificate}>CERTIFICATE of contribution</Text>
                    <Text style={styles.blurb_this_is_to}>This is to certify that</Text>
                    <Text style={styles.name}>{ contributor }</Text>
                    <Text style={styles.paragraph}>has contributed the amount of <Text>{ contribution }</Text> in <Text
                        style={styles.highlight}>USDT</Text> and will receive <Text
                        style={styles.highlight}>{ token_amount }</Text> tokens during the vesting period. </Text>
                    <Text style={styles.paragraph}>The price of the token will be approximately 0.001 USDT per MFT
                        (MeeFie) Token</Text>
                    <Text style={styles.paragraph}>The registered receiving wallet is { wallet }</Text>
                    <Image style={styles.signature} src={'./images/v11_20.png'}/>
                    <Text style={{fontWeight: 'bold', fontSize: '16px', textAlign: 'center', marginTop: '40'}}>Enrick
                        Licen</Text>
                    <Text style={styles.ceo}>CEO</Text>
                </View>
            </Page>
        </Document>
    </>
);

export default MyDocument;
