import serviceSubistrict from '../data/ServiceSubdistrict.json'
import serviceDistrict from '../data/ServiceDistrict.json'
import serviceProvince from '../data/ServiceProvince.json'
import serviceFormatFrom from "@/data/ServiceFormatFrom.json";
import { i18n } from "@/i18n";

export const validateMobile = () => {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ]

    let isMobile = toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem)
    })

    return isMobile
}

export const convertPlatform = (value) =>{
    let textPlatform = '-'
    if(value == null) {
        return serviceFormatFrom.from_selected_platform[0].text
    }
    serviceFormatFrom.from_selected_platform.forEach(function (item) {
        if(item.value == value.toUpperCase()){
            textPlatform =  item.text
        }
    });
    return textPlatform
}

export const getContract = (contractAddress) => {
    return contractAddress.slice(0, 13) + '.....' + contractAddress.slice(-11);
}

export const getContractActivity = (contractAddress) => {
    return contractAddress.slice(0, 11) + '.....' + contractAddress.slice(-4);
}

export const getConvertOrderId = (orderId) => {
    return orderId.slice(0, 4) + '...' + orderId.slice(-4);
}

export const isUseMetamask = () => {
    return typeof window.ethereum == 'object'
}

export const getAllPostcode = (value) => {


    if(value !== null && value !== undefined) {
        const districtList = serviceDistrict.district.filter(item => item.name_en == value)
        const postcodeList = serviceSubistrict.subdistrict.filter(item => item.id.substr(0, 4) == districtList[0].id)

        return sortASC([...new Set(postcodeList.map(item => item.zip_code))])
    }

   return ''
}

export const getAllDistrict = (value) => {

    if(value !== null && value !== undefined) {
        const provinceList = serviceProvince.province.filter(item => item.name_en == value);
        const districtList = serviceDistrict.district.filter(item => item.province_id == provinceList[0].id)

        return sortASC([...new Set(districtList.map(item => item.name_en))])
    }
    return ''
}

export const getAllProvince = () => {
    return sortASC([...new Set(serviceProvince.province.map(item => item.name_en))])
}

export const getDistrictByProvince = (province) => {
    const provinceList = serviceProvince.province.filter(item => item.name_en == province);
    const districtList = serviceDistrict.district.filter(item => item.province_id == provinceList[0].id)
    return sortASC([...new Set(districtList.map(item => item.name_en))])
}

export const getPostcodeByDistrict = (district) => {
    const districtList = serviceDistrict.district.filter(item => item.name_en == district)
    const postcodeList = serviceSubistrict.subdistrict.filter(item => item.id.substr(0, 4) == districtList[0].id)

    return sortASC([...new Set(postcodeList.map(item => item.zip_code))])
}

export const timeDifference = (previous) => {
    const sPerMinute = 60;
    const sPerHour = sPerMinute * 60;
    const sPerDay = sPerHour * 24;
    const sPerWeek = sPerDay * 7;

    const elapsed = Math.floor(Date.now() / 1000) - previous;

    if(elapsed >= (52 * sPerWeek)){
        return ` > 52 weeks ago` + i18n.t('profile-address.province');
    }
    else if ((elapsed >= sPerWeek || Math.round(elapsed/sPerDay) == 7) && elapsed < (52 * sPerWeek)) {
        return `${Math.round(elapsed/sPerWeek)} `+ i18n.t('redeem.history.weeks'); 
    }
    else if (elapsed >= sPerDay || Math.round(elapsed/sPerHour) == 24) {
        return `${Math.round(elapsed/sPerDay)} `+ i18n.t('redeem.history.days');
    }
    else if (elapsed >= sPerHour || Math.round(elapsed/sPerMinute) == 60) {
        return `${Math.round(elapsed/sPerHour )} `+ i18n.t('redeem.history.hours');
    }
    else{
        return `${Math.round(elapsed/sPerMinute)} `+ i18n.t('redeem.history.minutes'); 
    }
}

export const sortASC = (items) => {
    items.sort((a, b) => a.localeCompare(b));
    return items
}

export const sortDESC = (items) => {
    return sortASC(items).reverse()
}