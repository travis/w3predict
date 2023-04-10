'use client'

import { KeyringProvider, Authenticator } from '@w3ui/react-keyring'
import { UploaderProvider } from '@w3ui/react-uploader'
import { UploadsListProvider } from '@w3ui/react-uploads-list'

export default function Providers ({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <KeyringProvider>
      <Authenticator>
        <UploaderProvider>
          <UploadsListProvider>
            {children}
          </UploadsListProvider>
        </UploaderProvider>
      </Authenticator>
    </KeyringProvider>
  )
}