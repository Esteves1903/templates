export type BookingStep = 'service' | 'barber' | 'datetime' | 'contact' | 'success'

export interface BookingState {
  serviceId:    string | null
  serviceName:  string | null
  servicePrice: number | null
  barberId:     string | null
  barberName:   string | null
  date:         string | null
  time:         string | null
  name:         string
  phone:        string
  email:        string
}
