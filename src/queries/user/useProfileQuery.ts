import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '#queries/keys.ts'
import { requestGetProfile } from '#apis/domains/user.ts'

export function useProfileQuery() {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_PROFILE],
    queryFn: requestGetProfile,
    refetchOnWindowFocus: false,
  })
}
