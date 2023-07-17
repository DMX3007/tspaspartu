import Image from 'next/image'
import { useQuery, useMutation } from '@tanstack/react-query';
import classNames from 'classnames';

import { Navigation } from '@/components/Navigation/Navigation'
import { MainHeader } from '@/components/MainHeader/MainHeader';
import { Main } from '@/components/Main/Main';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { comfortaa } from '@/utils/fonts';
import { rubic } from '@/utils/fonts';

export default function Home() {
  return (
    <main className={classNames(comfortaa.className)}>
      <Navigation font={rubic.className} />
      <MainHeader font={rubic.className} />
      <Main font={comfortaa.className} />
      <SearchBar font={comfortaa.className} />
    </main>
  )
}