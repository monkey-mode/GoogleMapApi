export function resolveAddressName(
    address_components: google.maps.GeocoderAddressComponent[],
    formatted_address: string
  ) {
    let name = `${address_components[0].short_name} ${address_components[1].short_name} ${address_components[2].short_name}`
    const regex = /[+]/g
    if (regex.test(formatted_address.split(' ')[0])) {
      name = name.replace(`${formatted_address.split(' ')[0]} `, '')
      formatted_address = formatted_address.replace(`${formatted_address.split(' ')[0]} `, '')
    }
    return { name, formatted_address }
  }